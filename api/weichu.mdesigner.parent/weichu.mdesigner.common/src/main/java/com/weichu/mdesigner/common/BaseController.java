package com.weichu.mdesigner.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.ApplicationHome;
import org.springframework.http.MediaType;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerMapping;

public class BaseController {
	
	protected int fileMaxSize = 2 * 1024 * 1024;
	
	protected String getJarParentPath() {
		ApplicationHome home = new ApplicationHome(getClass());
		File jarFile = home.getSource();
		return jarFile.getParent();
	}
	

	protected String extractPathFromPattern(final HttpServletRequest request) {
		String path = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		String bestMatchPattern = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
		return new AntPathMatcher().extractPathWithinPattern(bestMatchPattern, path);
	}
	
	protected void responseFile(HttpServletResponse response, File imgFile) {
		String path = imgFile.getAbsolutePath();
		String suffix = path.substring(path.lastIndexOf("."));
		switch (suffix) {
		case ".png":
			response.setContentType(MediaType.IMAGE_PNG_VALUE);
			break;
		case ".jpg":
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			break;
		case ".gif":
			response.setContentType(MediaType.IMAGE_GIF_VALUE);
			break;
		default:
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			break;
		}
		try (InputStream is = new FileInputStream(imgFile); OutputStream os = response.getOutputStream();) {
			byte[] buffer = new byte[1024]; // 图片文件流缓存池
			while (is.read(buffer) != -1) {
				os.write(buffer);
			}
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
