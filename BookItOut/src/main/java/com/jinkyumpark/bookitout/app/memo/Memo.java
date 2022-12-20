package com.jinkyumpark.bookitout.app.memo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.book.model.Book;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor

@Entity
@Table(name = "Memo")
public class Memo {
    @Id
    @SequenceGenerator(name = "memo_seq", sequenceName = "memo_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "memo_seq")
    @Column(name = "memo_id")
    private Long memoId;

    @Column(name = "page", nullable = false)
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", foreignKey = @ForeignKey(name = "memo_book_fk"))
    private Book book;

    public Memo(Integer page, String content, Book book) {
        this.page = page;
        this.content = content;
        this.book = book;
    }
}
