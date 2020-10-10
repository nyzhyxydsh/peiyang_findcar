package niyuzhi.findcar.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * @author huhailong
 * get weixin openid
 */
@Component
@Slf4j
public class GetOpenId {
    @Autowired
    RestTemplate restTemplate;
    private String appId = "wx45567ff3407eda5d";
    private String secretId = "1825646114589b05336a1020d917db95";
    private String url = "https://api.weixin.qq.com/sns/jscode2session";

    public String getOpenId(String code){
        System.out.println("code:"+code);
        String requestUrl = url+"?appid="+appId+"&secret="+secretId+"&js_code="+code+"&grant_type=authorization_code";
        String result = restTemplate.getForObject(requestUrl,String.class);
        System.out.println("result:"+result);
        log.info("openid:"+result);
        return result;
    }
}
