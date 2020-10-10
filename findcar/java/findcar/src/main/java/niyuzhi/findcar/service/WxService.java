package niyuzhi.findcar.service;

import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import niyuzhi.findcar.utils.GetOpenId;
import niyuzhi.findcar.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class WxService {
    @Autowired
    private GetOpenId getOpenId;
    @Autowired
    private JsonUtil jsonUtil;
//    @Autowired
//    private SendMail sendMail;

    public JSONObject getOpenId(String code){
//        log.info("code:"+code);
       return jsonUtil.toJson(getOpenId.getOpenId(code));
    }

    public void sendMessage(String message,String userName){
//        sendMail.sendSimpleMail(message,userName);
    }
}
