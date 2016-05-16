# coding:utf-8
import django.utils.timezone as time


def timeString(dt):
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def is_valid_date(str):
    try:
        time.now().strptime(str, "%Y-%m-%d %H:%M:%S")
        return True
    except:
        return False
