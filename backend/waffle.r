library(ggplot2)
library(plotly)
library(waffle)
library(png)

setwd("~/Projects/WebdevEvaluator/backend")

csv_path <- "csv"

csv_filenames <- list.files(csv_path, pattern = "*.csv")

make_waffles <- function(file_name) {
  csv <- read.csv(file.path(csv_path, file_name))
  counts <- table(csv$Sentiment)
  names <- names(counts)
  vec <- as.vector(counts)

  second <- vec[2]
  vec[2] <- vec[3]
  vec[3] <- second
  second_label <- names[2]
  names[2] <- names[3]
  names[3] <- second_label
  names(vec) <- names

  waffles <- waffle(vec, rows = 25, size = 0.5)
  png(paste("waffle/", gsub(".csv", "", file_name), ".png", sep = ""))
  plot(waffles)
  dev.off()
}

result_list <- lapply(csv_filenames, make_waffles)