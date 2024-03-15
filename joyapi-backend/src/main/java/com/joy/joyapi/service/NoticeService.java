package com.joy.joyapi.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.joy.joyapi.model.dto.notice.NoticeAddRequest;
import com.joy.joyapi.model.dto.notice.NoticeQueryRequest;
import com.joy.joyapi.model.dto.notice.NoticeUpdateRequest;
import com.joy.joyapi.model.entity.Notice;

import java.util.List;

/**
 * @author Jason
 * @description 针对表【notice】的数据库操作Service
 * @createDate 2024-03-14 17:43:22
 */
public interface NoticeService extends IService<Notice> {

    /**
     * 获取最新的六条公告
     *
     * @return 最新的六条公告
     */
    List<Notice> getNewestNotice();

    /**
     * 新建公告
     *
     * @param notice 公告内容
     * @return 新建结果
     */
    boolean addNotice(NoticeAddRequest notice);

    /**
     * 更新公告
     *
     * @param noticeUpdateRequest 公告内容
     * @return 更新结果
     */
    boolean updateNotice(NoticeUpdateRequest noticeUpdateRequest);

    /**
     * 获取查询条件
     *
     * @param noticeQueryRequest 查询条件
     * @return 查询条件
     */
    Wrapper<Notice> getQueryWrapper(NoticeQueryRequest noticeQueryRequest);
}
