package niyuzhi.findcar.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import niyuzhi.findcar.entity.Release;
import niyuzhi.findcar.entity.WxUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import niyuzhi.findcar.service.ReleaseService;
import niyuzhi.findcar.service.WxService;
import niyuzhi.findcar.service.WxUserService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/wx")
public class WxController {
    @Autowired
    private WxService wxService;
    @Autowired
    private WxUserService wxUserService;
    @Autowired
    private ReleaseService releaseService;

    @GetMapping("/getOpenId")
    public JSONObject getOpenId(String code){
        return wxService.getOpenId(code);
    }


    @PostMapping("/loginInfo")
    public JSONObject loginInfo(@RequestBody WxUser user){
        log.info("userName:"+user.getUserName());
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String loginDate = format.format(new Date());
        user.setLoginDate(loginDate);
        return wxUserService.insert(user);
    }
    @PostMapping("/addRelease")
    public JSONObject addRelease(@RequestBody Release release){
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String addDate = format.format(new Date());
        release.setReleaseDate(addDate);
        System.out.println(release) ;
        return releaseService.addRelease(release);
    }

    @PostMapping("/selectRelease")
    public PageInfo<Release> selectRelease(@RequestBody Release release){
        return releaseService.selectRelease(release);
    }

    @GetMapping("/test")
    public String test(){
        return "Successful";
    }

    @GetMapping("/findCount")
    public List<Map<Object,Object>> findCount(String userId){
        return releaseService.findCount(userId);
    }

    @PostMapping("/deleteInfo")
    public JSONObject deleteInfo(@RequestBody Map<String,Integer> map){
        Integer id = map.get("id");
        return releaseService.delete(id);
    }

    @PostMapping("/getUserInfo")
    public WxUser getUserInfo(@RequestBody Map<String,String>map){
        String userId = map.get("openId");
        return wxUserService.selectByOpenId(userId);
    }

    @PostMapping("/updateInfo")
    public JSONObject updateInfo(@RequestBody WxUser user){
        return wxUserService.update(user);
    }

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestBody Map<String,String>map){
        String message = map.get("message");
        String userName = map.get("userName");
        wxService.sendMessage(message,userName);
    }
}
