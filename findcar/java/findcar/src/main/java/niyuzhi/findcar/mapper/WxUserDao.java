package niyuzhi.findcar.mapper;

import niyuzhi.findcar.entity.WxUser;
import org.apache.ibatis.annotations.Param;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface WxUserDao {

    int insert(@Param("pojo") WxUser pojo);

    int insertList(@Param("pojos") List< WxUser> pojo);

    List<WxUser> select(@Param("pojo") WxUser pojo);

    int update(@Param("pojo") WxUser pojo);

    WxUser selectByOpenId(@Param("userId")String userId);

}
