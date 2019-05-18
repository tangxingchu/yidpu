package com.weichu.youdianpu.network;

import android.content.Context;

import java.io.IOException;

import okhttp3.CacheControl;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Request;
import okhttp3.Response;

public class YdpHttpClient {

    private static final String TAG = YdpHttpClient.class.getSimpleName();

    public interface SafeCallback {
        void onFailure(Call call, IOException e);

        void onResponse(Call call, Response response);
    }

    private Context mContext;
    private YdpNetwork.OkHttpClientFactory mOkHttpClientFactory;

    protected YdpHttpClient(final Context context, final YdpNetwork.OkHttpClientFactory httpClientFactory) {
        mContext = context;
        mOkHttpClientFactory = httpClientFactory;
    }

    public void call(final Request request, final Callback callback) {
        mOkHttpClientFactory.getNewClient().newCall(request).enqueue(callback);
    }

    public void callSafe(final Request request, final SafeCallback callback) {
        final String uri = request.url().toString();

        mOkHttpClientFactory.getNewClient().newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                tryForcedCachedResponse(uri, request, callback, null, e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    tryForcedCachedResponse(uri, request, callback, response, null);
                }
            }
        });
    }

    public void callDefaultCache(final Request request, final SafeCallback callback) {
        final String uri = request.url().toString();

        tryForcedCachedResponse(uri, request, new SafeCallback() {

            @Override
            public void onFailure(Call call, IOException e) {
                call(request, new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        callback.onFailure(call, e);
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        callback.onResponse(call, response);
                    }
                });
            }

            @Override
            public void onResponse(Call call, Response response) {
                callback.onResponse(call, response);
            }

        }, null, null);
    }

    public void tryForcedCachedResponse(final String uri, final Request request, final SafeCallback callback, final Response initialResponse, final IOException initialException) {
        Request newRequest = request.newBuilder()
                .cacheControl(CacheControl.FORCE_CACHE)
                .header(YdpNetwork.IGNORE_INTERCEPTORS_HEADER, "blah")
                .build();
        mOkHttpClientFactory.getNewClient().newCall(newRequest).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                callback.onFailure(call, e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    callback.onFailure(call, initialException);
                }
            }
        });
    }

}
