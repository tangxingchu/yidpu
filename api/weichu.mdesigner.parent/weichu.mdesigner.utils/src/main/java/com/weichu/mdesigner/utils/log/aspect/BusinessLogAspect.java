package com.weichu.mdesigner.utils.log.aspect;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.utils.ip.IPUtils;
import com.weichu.mdesigner.utils.log.BusinessLog;
import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.LogType;
import com.weichu.mdesigner.utils.log.entity.SysLogger;

/**
 * 定义业务操作日志的切面, 写到rabbitmq中。在由单独的日志jar包消费入库。
 * 
 * @author tangxingchu
 * @date 2017-12-21
 */
@Aspect // 定义切面
@Component // 组件声明，spring的ioc会自动找到
public class BusinessLogAspect {

	private static final Logger logger = LoggerFactory.getLogger(BusinessLogAspect.class);

	@Autowired
	private ILogSender logSender;

	@Value("${business.log.enabled}")
	private boolean enabledLog;

	/**
	 * 定义切入点 所有service包
	 */
	@Pointcut("execution(* com.weichu.mdesigner.*.service.*.*(..))")
	public void excudeService() {
	}
	
	/**
	 * Before通知(方法执行前, 可以获取到入参)
	 * 
	 * @param joinPoint
	 */
	@Before("excudeService()")
	public void beforeMethod(JoinPoint joinPoint) {
		logger.debug(String.valueOf(joinPoint.getArgs()));
		logger.debug("切进业务方法...");
	}

	/**
	 * 后置通知,
	 * 
	 * @param joinPoint
	 */
	@After("excudeService()")
	public void afterMethod(JoinPoint joinPoint) {
		logger.debug("方法执行完了...");
	}

	/**
	 * 被切入的方法返回之后调用(retVal是方法返回值)
	 * 
	 * @param joinPoint
	 * @param retVal
	 */
	@AfterReturning(pointcut = "excudeService()", returning = "retVal")
	public void afterMethod(JoinPoint joinPoint, Object retVal) {
		if (retVal != null) {
			logger.debug(retVal.toString());
		}
	}

	/**
	 * 环绕通知(可以获取到被切入函数的入参、返回值。并且可以修改返回值)
	 * 
	 * @param pJoinPoint
	 * @return
	 * @throws Throwable
	 */
//	@Around("excudeService()")
	//只有申明了BusinessLog注解的才拦截
	@Around(value = "@annotation(com.weichu.mdesigner.utils.log.BusinessLog) && @annotation(businessLog)", argNames="businessLog")
	public Object aroundMethod(ProceedingJoinPoint pJoinPoint, BusinessLog businessLog) throws Throwable {
		Object obj = pJoinPoint.proceed();
		// List<String> vals = new ArrayList<String>();
		// vals.add("aaaaa");
		// obj = vals;
		if (enabledLog) {
			try {
				SysLogger sysLogger = new SysLogger();
				Object args[] = pJoinPoint.getArgs();
				//登录日志
				if(businessLog.type() == LogType.LOGIN && args.length > 0) {
					if(args[0] instanceof HttpServletRequest) {
						HttpServletRequest request = (HttpServletRequest) args[0];
						String ip = IPUtils.getRealIP(request);
						sysLogger.setIp(ip);
					} else if(args[0] instanceof String) {
						sysLogger.setUsername((String)args[0]);
					}
				}
				String methodName = pJoinPoint.getSignature().getName();
				String className = pJoinPoint.getTarget().getClass().getName();
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("args", args);
				jsonObject.put("return", obj);
				sysLogger.setLogTime(new Date());
				sysLogger.setLogType(businessLog.type().getCode());
				sysLogger.setClassName(className);
				sysLogger.setMethodName(methodName);
				sysLogger.setLogContent(jsonObject.toJSONString());
				logSender.sendLog(sysLogger);
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return obj;
	}

	/**
	 * 处理程序中未正确捕获的异常信息
	 * 
	 * @param ex
	 */
	@AfterThrowing(throwing = "ex", pointcut = "excudeService()")
	public void exceptionMethod(JoinPoint joinPoint, Throwable ex) {
		if (ex != null) {
			String methodName = joinPoint.getSignature().getName();
			String className = joinPoint.getTarget().getClass().getName();
			StringBuilder errorInfo = new StringBuilder();
			errorInfo.append("className:").append(className).append(",");
			errorInfo.append("methodName:").append(methodName).append(",");
			errorInfo.append("error:").append(ex.getMessage());
			logger.error(errorInfo.toString());
//			Object args[] = joinPoint.getArgs();
//			String methodName = joinPoint.getSignature().getName();
//			String className = joinPoint.getTarget().getClass().getName();
//			JSONObject jsonObject = new JSONObject();
//			jsonObject.put("args", args);
//			jsonObject.put("message", ex.getMessage());
//			SysLogger sysLogger = new SysLogger();
//			sysLogger.setLogTime(new Date());
//			sysLogger.setLogType(LogType.ERROR.getCode());
//			sysLogger.setClassName(className);
//			sysLogger.setMethodName(methodName);
//			sysLogger.setLogContent(jsonObject.toJSONString());
//			logSender.sendLog(sysLogger);
		}
	}

}
