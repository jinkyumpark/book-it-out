package com.jinkyumpark.bookitout.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class QnaEditRequest {
    private String question;
    private String password;
}
