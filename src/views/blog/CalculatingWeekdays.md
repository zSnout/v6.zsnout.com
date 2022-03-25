---
title: Calculating Weekdays
desc: Learn to calculate the day of the week for any date in the past or future!
---

_Published by Zachary Sakowitz on December 7, 2021._

Ever wondered what day your friend's birthday occurred, or whether the next July 4th will be a Thursday? You can calculate it using simple math, which you'll learn here!

\toc

- [Overview](#overview)
- [Calculate It!](#calculate-it)
- [Month Codes](#month-codes)
- [Century Codes](#century-codes)
- [Day Codes](#day-codes)

## Overview

This method uses codes that we add up to get to our final result.

## Calculate It!

As we explain the process, we'll use **December 16, 2482** as an example.

1. Take the last two digits of the year. In our example, this is $82$.
2. Divide by 4, and drop any remainder. For us, $\lfloor 82 \div 4 \rfloor = 20$.
3. Add the date of the month. We'll do $20 + 16 = 36$.
4. Add the month's value from the [month codes table](#month-codes). In our example, this is $6$, so we do $36 + 6 = 42$.
5. Add the century code from the [century codes table](#century-codes). In our example, this is $6$, so we do $42 + 6 = 48$.
6. Add the last two digits of the year. In our example, this was $82$, so we do $48 + 82 = 130$.
7. Divide by 7 and take the remainder. In our example, this is $130 \bmod 7 = 4$.
8. Find your day in the [day codes table](#day-codes). In our example, this is Wednesday. This is your final result!

## Month Codes

|    Month | Value |     Month | Value |
| -------: | :---- | --------: | :---- |
|  January | 1\*   |      July | 0     |
| February | 4\*   |    August | 3     |
|    March | 4     | September | 6     |
|    April | 0     |   October | 1     |
|      May | 2     |  November | 4     |
|     June | 5     |  December | 6     |

For leap years, use 2 for January and 5 for February.

## Century Codes

| Century                   | Value |
| ------------------------- | ----- |
| 1700s, 2100s, 2500s, etc. | 4     |
| 1800s, 2200s, 2600s, etc. | 2     |
| 1900s, 2300s, 2700s, etc. | 0     |
| 2000s, 2400s, 2800s, etc. | 6     |

## Day Codes

| Value | Day       |
| ----- | --------- |
| 0     | Saturday  |
| 1     | Sunday    |
| 2     | Monday    |
| 3     | Tuesday   |
| 4     | Wednesday |
| 5     | Thursday  |
| 6     | Friday    |
