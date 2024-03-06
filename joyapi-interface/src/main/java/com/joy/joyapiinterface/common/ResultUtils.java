package com.joy.joyapiinterface.common;

/**
 * 返回工具类
 *
 * @author Jason
 */
public class ResultUtils {

    /**
     * 成功
     *
     * @param data 数据
     * @param <T>  数据类型
     * @return 返回结果
     */
    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<>(200, data, "ok");
    }


    /**
     * 成功
     *
     * @param data 数据
     * @param <T>  数据类型
     * @return 返回结果
     */
    public static <T> BaseResponse<T> success(T data, String message) {
        return new BaseResponse<>(200, data, message);
    }

    /**
     * 失败
     *
     * @param errorCode 错误码
     * @return 返回结果
     */
    public static BaseResponse error(ErrorCode errorCode) {
        return new BaseResponse<>(errorCode);
    }

    /**
     * 失败
     *
     * @param code    错误码
     * @param message 错误信息
     * @return 返回结果
     */
    public static BaseResponse error(int code, String message) {
        return new BaseResponse(code, null, message);
    }

    /**
     * 失败
     *
     * @param errorCode 错误码
     * @return 返回结果
     */
    public static BaseResponse error(ErrorCode errorCode, String message) {
        return new BaseResponse(errorCode.getCode(), null, message);
    }
}
