---
date:
  created: 2023-03-30
  updated: 2024-11-21
---

# Guide for CityU TAs to Upload Student Grades to Canvas

<!-- more -->

## Background

CityU here refers to [City University of Hong Kong](https://www.cityu.edu.hk/).
CityU teaching assistants (TAs) are required to publish student grades on [Canvas](https://canvas.cityu.edu.hk/), for labs and assignments.
These grades come from elsewhere, most possibly [PASS3](https://pass3.cs.cityu.edu.hk/index.jsp), which is a [OJ](https://en.wikipedia.org/w/index.php?title=Online_judge&redirect=no) system.
We assume the grades are in a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file, since PASS3 can export it.

The guide is to show how to upload the grades to Canvas with its grade importing function, without typing them one by one.

## Preprocessing

If the grades are in an Excel (MS, WPS, or LibreOffice) file, use your corresponding Excel software to re-save it as a CSV file.

Trim the CSV file and only leave these columns: the grades and student EIDs.
Student EIDs are the ones input as usernames when students login to [AIMS](https://auth.cityu.edu.hk/), which are also the part that is before `-c@my.cityu.edu.hk` in their CityU emails.
Most Excel software can also be used as a GUI CSV editor.
If not, you can also use the Python builtin [`csv`](https://docs.python.org/3/library/csv.html) module.

Rename the grade columns as the lab or assignment name, e.g., `Lab1` or `Assignment1`, if the lab or assignment does not exist on Canvas and you are going to create it.
If you want to upload grades to exist labs or assignments, name the columns as the lab or assignment ID, which can be found on Canvas.
And rename the EID column as `SIS Login ID`.
Canvas has a [grade importing guide](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-import-grades-in-the-Gradebook/ta-p/807) for this.

## Merge Other Metadata

Only `SIS Login ID` is not enough for uploading grades to Canvas.
Export a grade summary from Canvas as a template, which contains `Student`, `ID`, `SIS User ID`, `SIS Login ID`, `Section` columns.
Only leave the 5 columns above and remove others.
The template can be reused in the future for the students in the course.

Install Python package [csvkit](https://csvkit.readthedocs.io) for `csvjoin` command.
Join the template and preprocessed grades on the `SIS Login ID` column as:

```bash
csvjoin -c 'SIS Login ID' template.csv grades.csv > result.csv
```

## Buggy Canvas CSV Importing

Canvas would not accept the result CSV file during grade importing.
You need to sort the columns **in this particular order**: `Student`, `ID`, `SIS User ID`, `SIS Login ID`, `Section`, and finally the grades.
Now it should work🎉

## History

-   2024-11-21: Revise the writing.
    Canvas could have fixed the CSV importing bug, but I have no way to verify it.
    Please contact me if you tried.
