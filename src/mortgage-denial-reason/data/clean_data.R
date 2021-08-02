
rm(list = ls())

library(tidyverse)

dt.raw <- read.csv("reasons_for_denial_210727.csv")

dt <- dt.raw %>%
  rename(race = Race.Ethnicity,
         n_reason = reason_count,
         n_total = total_denials,
         pct_reason = reason_rate) %>%
  mutate(reason = recode(reason, 
                         "DTI Ratio" = "Debt-to-Income Ratio",
                         "Credit Application Incomplete" = "Incomplete Credit Application",
                         .default = reason),
         pct_reason = n_reason / n_total) %>%
  group_by(reason) %>%
  mutate(n_reason.all = sum(n_reason, na.rm = T),
         n_total.all = sum(n_total, na.rm = T),
         pct_reason.all = n_reason.all / n_total.all) %>%
  ungroup() %>%
  group_by(race) %>%
  arrange(-pct_reason.all) %>%
  mutate(reason_rk.all = row_number()) %>%
  ungroup() %>%
  arrange(race, reason_rk.all) %>%
  set_names(gsub("[.]", "_", names(.)))

dt %>%
  write.csv("reasons_for_denial_210727_clean.csv", row.names = F)
