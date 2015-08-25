package com.objectpartners.plummer.angular_cache;

import java.util.ArrayList;
import java.util.List;
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
    public List<Integer> list() {
        List<Integer> data = new ArrayList<>();
        for (int i = 0; i < RANDOM.nextInt(10) + 1; i++) {
            data.add(RANDOM.nextInt(100));
        }
        return data;
    }
}
