package com.jinkyumpark.bookitout.app.statistics.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ResponseStatus(HttpStatus.OK)
public class ReadTimeResponse {
    private Integer status;
    private List<Integer> timeSeriesData;
}
