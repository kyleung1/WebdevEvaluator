# library(plotly)
# library(htmlwidgets)

# setwd("~/Projects/WebdevEvaluator/backend")

# csv_path <- "wordcounts"

# csv_filenames <- list.files(csv_path, pattern = "*.csv")

# make_bar <- function(file_name) {
#   csv <- read.csv(file.path(csv_path, file_name))
#   csv <- csv %>%
#     head(20)
#   fig <- plot_ly(
#     csv,
#     x = ~word,
#     y = ~count,
#     color = ~word,
#     type = "bar",
#     text = csv$count,
#     textposition = "auto",
#     sort = csv$word,
#     marker = list(
#       line = list(color = "rgb(8,48,107)", width = 1.5)
#     )
#   )

#   fig <- fig %>% layout(
#     title = paste("Most Frequent Words in Tweets about", gsub(".csv", "",
#     file_name), " "),
#     xaxis = list(title = "Word", categoryorder = "total descending"),
#     yaxis = list(title = "Count")
#   )

#   file.create(paste("bar/", gsub(".csv", "", file_name), ".html", sep = ""))

#   saveWidget(fig, file = paste("bar/", gsub(".csv", "", file_name), ".html", sep = ""))
# }

# result_list <- lapply(csv_filenames, make_bar)