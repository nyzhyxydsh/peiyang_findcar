package niyuzhi.findcar.service;

import com.alibaba.fastjson.JSONObject;
import niyuzhi.findcar.entity.WxUser;
import niyuzhi.findcar.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import niyuzhi.findcar.mapper.WxUserDao;

@Service
public class WxUserService {

    @Autowired
    WxUserDao wxUserDao;
    @Autowired
    JsonUtil util;

    public JSONObject insert(WxUser pojo){
        return util.updateJson(wxUserDao.insert(pojo));
    }

    public int insertList(List< WxUser> pojos){
        return wxUserDao.insertList(pojos);
    }

    public List<WxUser> select(WxUser pojo){
        return wxUserDao.select(pojo);
    }

    public JSONObject update(WxUser pojo){
        return util.updateJson(wxUserDao.update(pojo));
    }

    public WxUser selectByOpenId(String userId){
        return wxUserDao.selectByOpenId(userId);
    }

}
