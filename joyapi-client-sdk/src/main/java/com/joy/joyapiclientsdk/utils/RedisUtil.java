package com.joy.joyapiclientsdk.utils;

import cn.hutool.db.nosql.redis.RedisDS;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;

/**
 * @program: joyapi-interface
 * @ClassName: RedisUtil
 * @description: Redis工具类
 * @author: Jason
 * @create: 2024-03-07 22:56
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
@Component
public class RedisUtil {
    Jedis jedis = RedisDS.create().getJedis();

    public void set(String key, String value) {
        jedis.set(key, value);
    }

    public String get(String key) {
        return jedis.get(key);
    }

    public void del(String key) {
        jedis.del(key);
    }

    public void expire(String key, long seconds) {
        jedis.expire(key, seconds);
    }

    public void close() {
        jedis.close();
    }

    public void set(String key, String value, long seconds) {
        jedis.set(key, value);
        jedis.expire(key, seconds);
    }

    public void setex(String key, int seconds, String value) {
        jedis.setex(key, seconds, value);
    }

    public void setnx(String key, String value) {
        jedis.setnx(key, value);
    }

    public void setnx(String key, String value, long seconds) {
        jedis.setnx(key, value);
        jedis.expire(key, seconds);
    }


}
