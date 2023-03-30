---
title: Guide for CityU HK TAs to upload student grades to Canvas
pubDate: 2023-03-30
updDate: 2023-03-30
abstract: Get CSV grades from PASS3, merge them with the Canvas template via csvjoin, and import the output on Canvas.
tags: cityu ta-chore
---

<!-- Copyright (C) myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Before start

The guide, as the title says, is for TAs of [CityU HK](https://www.cityu.edu.hk/), which is denoted as CityU without ambiguity.
CityU uses [Canvas](https://canvas.cityu.edu.hk/) as the online learning platform which includes lab and assignment grade publishing.
If you are a CityU TA, you will get grades from [PASS3](https://pass3.cs.cityu.edu.hk/index.jsp), which is a OJ system used by CityU, or other sources like manual processing.
To publish the grades, you need to upload them to Canvas, and the guide is just to show a optimized way to make it.

## Source and preprocessing

If the grades are on PASS3, export them as [CSV](https://wikipedia.org/wiki/Comma-separated_values).
If the grades are an Excel (MS, WPS, or LibreOffice) file, open and re-save it as CSV.

Then trim the CSV file to only keep the 2 columns: the grades and the student EIDs.
The student EIDs is the one in their Emails, and also used to login [AIMS](https://banweb.cityu.edu.hk/pls/PROD/twgkpswd_cityu.P_WWWLogin), which is the student management system used by CityU.
If you do not have a GUI CSV editor, you can use the Python builtin `csv` package to make it.

Rename the grade columns as the lab or assignment name, e.g., `Lab1` for the lab 1, or `Assignment1` for the assignment 1.
if you want to merge the grades with other ones already on Canvas, you need to name it as the assignment ID, which can also be found on Canvas.
And rename the EID column as **`SIS Login ID`**.
For detailed information, check the [grade importing guide of Canvas](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-import-grades-in-the-Gradebook/ta-p/807).

## Merge to standard format

Export a grade summary from Canvas as a template, which contains `Student`, `ID`, `SIS User ID`, `SIS Login ID`, `Section`, and some other columns.
Only leave 5 columns above and remove other ones.
You can always use the template later and there is no need to export it again, since we only need the student metadata other than latest grades.

Install [csvkit](https://csvkit.readthedocs.io), which is a Python package, for `csvjoin` command.
Join the template and grades on the `SIS Login ID` column as:

```bash
csvjoin -c 'SIS Login ID' template.csv grades.csv > result.csv
```

Now there is the tricky part.
While Canvas can import CSV grades to itself, which is what the guide is about to do, it requires not only several columns but keeping the columns in a particular order (Which is wired IMO. Seems they make a CSV parser by themselves and without thorough thinking.).
You need to modify it to keep the columns in the order: `Student`, `ID`, `SIS User ID`, `SIS Login ID`, `Section`, and finally the grades.

## Upload to publish

Finally, import the result CSV file in the `Grades` tab of Canvas.
If you need to change the assignment type, later change it in the `Assignments` Tab.
