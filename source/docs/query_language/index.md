# Overview

InfluxDB features a SQL like query language, only used for querying data. The HTTP API has endpoints for writing data and performing other database administration tasks. The only exception to this is [continuous queries](/docs/query_language/continuous_queries.html), which perpetually write their results into one or more time series.

The [getting started section](/docs) has some example queries. This section will cover all of the available functions and provide some examples.

## Changes to the query language in v0.4.0

Starting with version 0.4.0 the equality and inequality operators are
changed to `=` and `<>` from `==` and `!=`, respectively. Examples in this doc
will be changed once 0.4.0 is officially released.

## Select and Time Ranges

By default, InfluxDB returns data in time descending order. The most efficient queries run over only a single column in a given time series.

```sql
select value from response_times;
```

This simple query pulls the values for the `value` column from the `response_times` series.

### Older versions

Prior to version 0.4.0, InfluxDB will apply some limits to the number of points and the time range. Without those arguments specified, the previous query would actually get converted to:

```sql
select value from response_times where time > now() - 1h limit 1000;
```

The default is to limit the time range to an hour or the last 1000 points, whichever comes first.

### How to set query start and end time

If start and end times aren't set they will default to beginning of
time until now, respectively.

The column `time` is built in for every time series in the
database. You specify the start and end times by setting conditions on
the `time` columns in the where clause.

Below are the different formats that can be used to specify start and
end times.

#### Date time strings

Date time strings have the format `YYYY-MM-DD HH:MM:SS.mmm` where
`mmm` are the milliseconds within the second. For example:

```sql
select value from response_times
where time > '2013-08-12 23:32:01.232' and time < '2013-08-13';
```

The time and date should be wrapped in single quotes. If you only
specify the date, the time will be set to `00:00:00`. The `.232` after
the hours, minutes, and seconds is optional and specifies the
milliseconds.

#### Relative time

You can use `now()` to calculate a timestamp relative to the server's
current timestamp. For example:

```sql
select value from response_times where time > now() - 1h limit 1000;
```

will return all points starting an hour ago until now.

Other options for how to specify time durations are `u` for
microseconds, `s` for seconds, `m` for minutes, `h` for hours, ,`d`
for days and `w` for weeks. If no suffix is given the value is
interpreted as nanoseconds.

#### Absolute time

You can specify timestamp in epoch time, which is defined as the
number of nanoseconds that have elapsed since 00:00:00 Coordinated
Universal Time (UTC), Thursday, 1 January 1970. You can use the same
suffixes from the previous section if you don't want to specify
timestamp in nanoseconds. For example:

```sql
select value from response_times where time > 1388534400s
```

will return all points that were writtern after `2014-01-01 00:00:00`

### Selecting a Specific Point

Points are uniquely identified by the time series they appear in, the time, and the sequence number. Here's a query that returns a specific point.

```sql
select * from events where time == 1383154176 and sequence_number == 2321;
```

**Note**: this feature isn't implemented yet, see [this issue](https://github.com/influxdb/influxdb/issues/108) for current status.

### Selecting Multiple Series

You can select from multiple series by name or by specifying a regex to match against. Here are a few examples.

```sql
select * from events, errors;
```

Get the last hour of data from the two series `events`, and `errors`. Here's a regex example:

```sql
select * from /stats\..*/i;
```

Get the last hour of data from every time series that starts with `stats.` (case insensitive). Another example:

```sql
select * from /.*/ limit 1;
```

Return the last point from every time series in the database.

## Deleting data

The delete query looks like the following:

`delete from response_times where time > now() - 1h`

With no time constraints this query will delete every point in the
time series `response_times`. You have to be a db admin in order to be
able to delete data from timeseries.

Any conditions in the where clause that don't set the start and/or end
time will be ignored, for example the following query:

`delete from response_times where user = 'foo'`

will return an error.

## The Where Clause

We've already seen the where clause for selecting time ranges and a specific point. You can also use it to filter based on given values, comparators, or regexes. Here are some examples of different ways to use where.

```sql
select * from events where state == 'NY';

select * from log_lines where line =~ /error/i;

select * from events where customer_id == 23 and type == 'click';

select * from response_times where value > 500;

select * from events where email !~ /.*gmail.*/;

select * from nagios_checks where status != 0;

select * from events 
where (email =~ /.*gmail.* or email =~ /.*yahoo.*/) and state == 'ny';
```

The where clause supports comparisons against regexes, strings, booleans, floats, integers, and the times listed before. Comparators include `==` equal to, `>` greater than, `<` less than, `!=` not equal to, `=~` matches against, `!~` doesn't match against. You can chain logic together using `and` and `or` and you can separate using `(` and `)`

## Group By

The group by clause in InfluxDB is used not only for grouping by given values, but also for grouping by given time buckets. You'll always be pairing this up with [a function](/docs/query_language/functions.html) in the `select` clause. Here are a few examples to illustrate how group by works.

```sql
-- count of events in 10 minute intervals
select count(type) from events group by time(10m);

-- count of each unique type of event in 10 minute intervals
select count(type) from events group by time(10m), type;

-- 95th percentile of response times in 30 second intervals
select percentile(value, 95) from response_times group by time(30s);
```

The time bucket should be in terms of `us`, `ms`, `s`, `m` and `h`.

## Merging Series

You can merge multiple time series into a single stream in the select clause. This is helpful when you want to run a function over one of the columns with an associated group by time clause.

```sql
select count(type) from user_events merge admin_events group by time(10m)
```

You'd get a single time series with the count of events from the two combined in 10 minute intervals.

```sql
select * from merge /stats.*/
```

The above query would merge all of the stats time series into one.

## Joining Series

Joins will put two or more series together. Since timestamps may not match exactly, InfluxDB will make a best effort to put points together. Joins are used when you want to perform a transformation of one time series against another. Here are a few examples.

```sql
select hosta.value + hostb.value 
from cpu_load as hosta 
inner join cpu_load as hostb 
where hosta.host = 'hosta.influxdb.orb' and hostb.host = 'hostb.influxdb.org';
```

The above query will return a time series of the combined cpu load for hosts a and b. The individual points will be coerced into the closest time frames to match up.

```sql
select errors_per_minute.value / page_views_per_minute.value 
from errors_per_minute 
inner join page_views_per_minute 
```

The above query will return the error rate per minute.
