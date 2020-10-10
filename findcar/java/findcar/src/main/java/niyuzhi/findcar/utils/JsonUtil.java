package niyuzhi.findcar.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class JsonUtil {

    public JSONObject toJson(String str){
        return JSON.parseObject(str);
    }

    public JSONObject updateJson(Integer integer){
        JSONObject jsonObject = new JSONObject();
        if(integer >= 1 ){
            jsonObject.put("success",true);
        }else if(integer < 1){
            jsonObject.put("success",true);
        }
        return jsonObject;
    }
}
