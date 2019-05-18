package com.weichu.mdesigner.utils.email;

import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {

	Logger logger = LoggerFactory.getLogger(EmailSender.class);
	
	@Autowired
	private JavaMailSenderImpl mailSender;
	
	/**
	 * 发送邮件通知我们内部管理系统
	 * @param merchantUser
	 */
	public void sendMail(String subject, String body) {
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					MimeMessage mimeMessage = mailSender.createMimeMessage();
					MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
					mimeMessageHelper.setTo(new String[] { "51697550@qq.com", "413697012@qq.com" });
					mimeMessageHelper.setFrom("tangxingchu9527@163.com");
					mimeMessageHelper.setSubject(subject);
					// 启用html
					mimeMessageHelper.setText(body, true);
					// 发送邮件
					mailSender.send(mimeMessage);
				} catch (Exception e) {
					logger.error(e.getMessage());
					e.printStackTrace();
				}
			}
		}).start();
	}
	
}
