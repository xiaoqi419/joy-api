package com.joy.joyapi.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.joy.joyapi.annotation.AuthCheck;
import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.common.ResultUtils;
import com.joy.joyapi.constant.UserConstant;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.exception.ThrowUtils;
import com.joy.joyapi.model.dto.notice.NoticeAddRequest;
import com.joy.joyapi.model.dto.notice.NoticeQueryRequest;
import com.joy.joyapi.model.dto.notice.NoticeUpdateRequest;
import com.joy.joyapi.model.entity.Notice;
import com.joy.joyapi.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Jason
 * @description 公告控制器
 */
@RestController
@RequestMapping("/notice")
@Slf4j
public class NoticeController {

    @Resource
    private NoticeService noticeService;

    /**
     * 分页获取公告
     *
     * @param noticeQueryRequest 公告查询条件
     * @return 公告列表
     */
    @PostMapping("/getNoticeList")
    @ApiOperation(value = "分页获取公告", notes = "分页获取公告")
    public BaseResponse<Page<Notice>> getNoticeList(NoticeQueryRequest noticeQueryRequest) {
        long current = noticeQueryRequest.getCurrent();
        long pageSize = noticeQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(pageSize > 20, ErrorCode.PARAMS_ERROR);
        Page<Notice> noticePage = noticeService.page(new Page<>(current, pageSize),
                noticeService.getQueryWrapper(noticeQueryRequest));
        if (noticePage == null) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }
        return ResultUtils.success(noticePage);
    }


    /**
     * 新建公告
     *
     * @param notice 公告
     * @return 新建结果
     */
    @PostMapping("/addNotice")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "新建公告", notes = "新建公告")
    public BaseResponse<String> addNotice(NoticeAddRequest notice) {
        if (notice.getContent() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = noticeService.addNotice(notice);
        if (!result) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }
        return ResultUtils.success("新建成功");
    }


    /**
     * 获取最新的六条公告
     *
     * @return 最新的六条公告
     */
    @GetMapping("/getNewestNotice")
    @ApiOperation(value = "获取最新的公告", notes = "获取最新的六条公告")
    public BaseResponse<List<Notice>> getNewestNotice() {
        List<Notice> noticeList = noticeService.getNewestNotice();
        return ResultUtils.success(noticeList);
    }

    /**
     * 更新公告
     */
    @PostMapping("/updateNotice")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "更新公告", notes = "更新公告")
    public BaseResponse<String> updateNotice(NoticeUpdateRequest noticeUpdateRequest) {
        if (noticeUpdateRequest.getId() == null || noticeUpdateRequest.getContent() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = noticeService.updateNotice(noticeUpdateRequest);
        if (!result) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }
        return ResultUtils.success("更新成功");
    }

    /**
     * 删除公告
     */
    @PostMapping("/deleteNotice")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "删除公告", notes = "删除公告")
    public BaseResponse<String> deleteNotice(Integer id) {
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = noticeService.removeById(id);
        if (!result) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }
        return ResultUtils.success("删除成功");
    }

}
