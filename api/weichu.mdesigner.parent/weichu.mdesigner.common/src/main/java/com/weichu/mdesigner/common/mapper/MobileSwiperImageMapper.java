package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MobileSwiperImage;
import com.weichu.mdesigner.common.entity.MobileSwiperImageExample;

public interface MobileSwiperImageMapper {
    long countByExample(MobileSwiperImageExample example);

    int deleteByExample(MobileSwiperImageExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MobileSwiperImage record);

    int insertSelective(MobileSwiperImage record);

    List<MobileSwiperImage> selectByExample(MobileSwiperImageExample example);

    MobileSwiperImage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MobileSwiperImage record);

    int updateByPrimaryKey(MobileSwiperImage record);
}