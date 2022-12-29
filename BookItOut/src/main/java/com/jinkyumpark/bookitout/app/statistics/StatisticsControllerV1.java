package com.jinkyumpark.bookitout.app.statistics;

import com.jinkyumpark.bookitout.app.book.BookService;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.book.model.BookCategory;
import com.jinkyumpark.bookitout.app.book.model.BookLanguage;
import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.app.statistics.model.DayStatistics;
import com.jinkyumpark.bookitout.app.readingsession.ReadingSessionService;
import com.jinkyumpark.bookitout.app.statistics.response.CategoryStatisticsResponse;
import com.jinkyumpark.bookitout.app.statistics.response.LanguageStatisticsResponse;
import com.jinkyumpark.bookitout.app.statistics.response.SummaryStatistics;
import com.jinkyumpark.bookitout.app.statistics.model.YearStatistics;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/statistics")
public class StatisticsControllerV1 {
    private StatisticsService statisticsService;
    private ReadingSessionService readingSessionService;
    private BookService bookService;

    @GetMapping("month")
    public MonthStatistics getStatisticsByMonth(@RequestParam(value = "year", required = false) Integer year,
                                                @RequestParam(value = "month", required = false) Integer month) {
        if (year == null) year = LocalDateTime.now().getYear();
        if (month == null) month = LocalDateTime.now().getMonthValue();
        Long loginUserId = AppUserService.getLoginAppUserId();

        return statisticsService.getStatisticsByMonth(loginUserId, year, month);
    }

    @GetMapping("year/{year}")
    public SummaryStatistics getStatisticsByYear(@PathVariable(value = "year", required = false) Integer year) {
        if (year == null) year = LocalDateTime.now().getYear();
        Long loginUserId = AppUserService.getLoginAppUserId();

        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(loginUserId, year);

        int totalReadTimeMinute = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalReadMinute)
                .sum();

        int totalReadBookCount = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getFinishedBook)
                .sum();

        int totalStar = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalStar)
                .sum();
        double averageStar = totalStar / (totalReadBookCount == 0 ? 1 : totalReadBookCount * 1.0);

        int totalReadPage = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getTotalPage)
                .sum();

        boolean isThisYear = LocalDateTime.now().getYear() == year;
        int averageReadTime = totalReadTimeMinute / (
                isThisYear ?
                        LocalDateTime.now().getDayOfYear()
                        : 365
        );

        int mostReadTime = monthStatisticsList.stream()
                .mapToInt(MonthStatistics::getMaxReadMinute)
                .max().orElse(0);

        // TODO : Goal

        YearStatistics yearStatistics = new YearStatistics(totalReadTimeMinute, totalReadBookCount, averageStar, totalReadPage);
        DayStatistics dayStatistics = new DayStatistics(averageReadTime, mostReadTime);
        SummaryStatistics summaryStatistics = new SummaryStatistics(HttpStatus.OK.value(), year, yearStatistics, dayStatistics, 50);

        return summaryStatistics;
    }

    @GetMapping("/read-time/{day}")
    public List<Integer> getReadTime(@PathVariable("day") Integer dayRange) {
        Long loginUserId = AppUserService.getLoginAppUserId();

        return readingSessionService.getReadTimeByDateRange(loginUserId, LocalDateTime.now().minusDays(dayRange - 1), LocalDateTime.now());
    }

    @GetMapping("language")
    public List<LanguageStatisticsResponse> getBookLanguageStatistics() {
        Long loginUserId = AppUserService.getLoginAppUserId();

        PageRequest pageRequest = PageRequest.of(0, 10000);
        List<Book> allBookList = bookService.getAllBooks(loginUserId, pageRequest);

        Map<BookLanguage, Integer> doneBookLanguageMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getLanguage)
                .forEach(language -> doneBookLanguageMap.merge(language, 1, Integer::sum));

        Map<BookLanguage, Integer> notDoneBookLanguageMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> !book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getLanguage)
                .forEach(language -> notDoneBookLanguageMap.merge(language, 1, Integer::sum));

        List<LanguageStatisticsResponse> languageStatistics = new ArrayList<>();
        List<BookLanguage> bookLanguageList = List.of(
                BookLanguage.KOREAN,
                BookLanguage.ENGLISH,
                BookLanguage.JAPANESE,
                BookLanguage.CHINESE,
                BookLanguage.FRENCH,
                BookLanguage.SPANISH
        );
        for (BookLanguage language : bookLanguageList) {
            Integer doneBook = doneBookLanguageMap.getOrDefault(language, 0);
            Integer notDoneBook = notDoneBookLanguageMap.getOrDefault(language, 0);
            languageStatistics.add(new LanguageStatisticsResponse(language, doneBook, notDoneBook));
        }

        return languageStatistics;
    }

    @GetMapping("category")
    public List<CategoryStatisticsResponse> getBookCategoryStatistics() {
        Long loginUserId = AppUserService.getLoginAppUserId();

        PageRequest pageRequest = PageRequest.of(0, 10000);
        List<Book> allBookList = bookService.getAllBooks(loginUserId, pageRequest);

        Map<BookCategory, Integer> doneCategoryMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getCategory)
                .forEach(category -> doneCategoryMap.merge(category, 1, Integer::sum));

        Map<BookCategory, Integer> notDoneCategoryMap = new HashMap<>();
        allBookList.stream()
                .filter(book -> !book.getCurrentPage().equals(book.getEndPage()))
                .map(Book::getCategory)
                .forEach(category -> notDoneCategoryMap.merge(category, 1, Integer::sum));

        List<CategoryStatisticsResponse> categoryStatisticsList = new ArrayList<>();
        List<BookCategory> bookCategoryList = List.of(
                BookCategory.OTHERS,
                BookCategory.PHILOSOPHY,
                BookCategory.RELIGION,
                BookCategory.SOCIAL_SCIENCE,
                BookCategory.NATURAL_SCIENCE,
                BookCategory.TECHNOLOGY,
                BookCategory.ART,
                BookCategory.LANGUAGE,
                BookCategory.LITERATURE,
                BookCategory.HISTORY
        );
        for (BookCategory category : bookCategoryList) {
            Integer doneCategory = doneCategoryMap.getOrDefault(category, 0);
            Integer notDoneCategory = notDoneCategoryMap.getOrDefault(category, 0);
            categoryStatisticsList.add(new CategoryStatisticsResponse(category, doneCategory, notDoneCategory));
        }

        return categoryStatisticsList;
    }
}
