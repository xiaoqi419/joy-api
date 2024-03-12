package com.joy.joyapi.controller;

import cn.hutool.core.io.FileUtil;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.model.enums.FileUploadBizEnum;
import com.joy.joyapi.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.Arrays;

/**
 * 文件接口
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@RestController
@RequestMapping("/file")
@Slf4j
public class FileController {

    @Resource
    private FileService fileService;


    /**
     * 校验文件
     *
     * @param multipartFile     文件
     * @param fileUploadBizEnum 业务类型
     */
    private void validFile(MultipartFile multipartFile, FileUploadBizEnum fileUploadBizEnum) {
        // 文件大小
        long fileSize = multipartFile.getSize();
        // 文件后缀
        String fileSuffix = FileUtil.getSuffix(multipartFile.getOriginalFilename());
        final long ONE_M = 1024 * 1024L;
        if (FileUploadBizEnum.USER_AVATAR.equals(fileUploadBizEnum)) {
            if (fileSize > ONE_M) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "文件大小不能超过 1M");
            }
            if (!Arrays.asList("jpeg", "jpg", "svg", "png", "webp").contains(fileSuffix)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "文件类型错误");
            }
        }
    }

    /**
     * 上传用户头像
     *
     * @param multipartFile 文件
     * @return 文件路径
     */
    @PostMapping("/uploadUserAvatar")
    public String uploadUserAvatar(@RequestPart("file") MultipartFile multipartFile) {
        validFile(multipartFile, FileUploadBizEnum.USER_AVATAR);
        return fileService.upload(multipartFile);
    }


}
