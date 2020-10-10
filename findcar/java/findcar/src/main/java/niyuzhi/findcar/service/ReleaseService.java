package niyuzhi.findcar.service;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import niyuzhi.findcar.entity.Release;
import niyuzhi.findcar.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import niyuzhi.findcar.mapper.ReleaseDao;

import java.util.List;
import java.util.Map;

@Service
public class ReleaseService {
    @Autowired
    ReleaseDao releaseDao;

    @Autowired
    JsonUtil util;

    public JSONObject addRelease(Release release){
        return util.updateJson(releaseDao.insert(release));
    }
//获取某人发布的信息
    public PageInfo<Release> selectRelease(Release release){
        PageHelper.startPage(release.getPageNum(),release.getPageSize());
        List<Release> list = releaseDao.select(release);
        return new PageInfo<>(list);
    }

    public  List<Map<Object,Object>> findCount(String userId){
        return releaseDao.findCount(userId);
    }

    public JSONObject delete(Integer id){
        return util.updateJson(releaseDao.delete(id));
    }

}
