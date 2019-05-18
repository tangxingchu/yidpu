package com.weichu.mdesigner.api.exception;

public enum ExpEnum implements IExp {
	
	NO_PERMISSION(001, "权限不足"),
	
	ERROR(500, "服务器内部错误");
    
    private final int code;
	
	private final String description;
	
	private ExpEnum(int code, String description) {
		this.code = code;
		this.description = description;
	}
	
	public static ExpEnum lookup(int requestStatus) {
        for (ExpEnum status : ExpEnum.values()) {
            if (status.getCode() == requestStatus) {
                return status;
            }
        }
        return null;
    }
	
	@Override
    public String getDescription() {
        return "" + this.code + " " + this.description;
    }
	
	@Override
    public int getCode() {
        return this.code;
    }
	
}
