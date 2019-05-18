package com.weichu.youdianpu.network;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Network Interceptors 网络拦截器
 * request请求带上token
 */
public class TokenInterceptor implements Interceptor {

    private static final String USER_TOKEN = "Authorization";
    private final String accessToken;

    public TokenInterceptor(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        final Request request = chain.request().newBuilder()
                .addHeader(USER_TOKEN, "Bearer " + accessToken)
                .build();
        return chain.proceed(request);
    }
}
