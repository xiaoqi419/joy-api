package com.joy.joyapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapi.mapper.NoticeMapper;
import com.joy.joyapi.model.dto.notice.NoticeAddRequest;
import com.joy.joyapi.model.dto.notice.NoticeUpdateRequest;
import com.joy.joyapi.model.entity.Notice;
import com.joy.joyapi.service.NoticeService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Jason
 * @description 针对表【notice】的数据库操作Service实现
 * @createDate 2024-03-14 17:43:22
 */
@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice>
        implements NoticeService {

    @Override
    public List<Notice> getNewestNotice() {
        // 从数据库中获取六条最新的公告
        QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("create_time");
        queryWrapper.last("limit 6");
        return this.list(queryWrapper);
    }

    @Override
    public boolean addNotice(NoticeAddRequest notice) {
        // 新建公告
        Notice newNotice = new Notice();
        newNotice.setContent(notice.getContent());
        return this.save(newNotice);
    }

    @Override
    public boolean updateNotice(NoticeUpdateRequest noticeUpdateRequest) {
        // 更新公告
        Notice notice = new Notice();
        notice.setId(Math.toIntExact(noticeUpdateRequest.getId()));
        notice.setContent(noticeUpdateRequest.getContent());
        return this.updateById(notice);
    }
}




