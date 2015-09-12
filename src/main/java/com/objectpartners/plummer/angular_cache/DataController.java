package com.objectpartners.plummer.angular_cache;

import java.util.Random;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(DataController.RESOURCE_ROOT_URL)
public class DataController {
    protected static final Random RANDOM = new Random();
    public static final String RESOURCE_ROOT_URL = "/data";

    @RequestMapping(value = "/{version}", method = RequestMethod.GET)
    public Integer[] list() {
        return new Integer[]{RANDOM.nextInt(100)};
    }
}
