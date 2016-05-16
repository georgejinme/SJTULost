import qiniu
import qiniu.config
import django.utils.timezone as timezone

ACCESS_KEY = '8cWwOsrZzbf55SkNtySdbHoQ4ctqFCLWQtGpz2HO'
SECRET_KEY = 'ARUvI86Xvip6JoEE1wE6-uAaoHE1EuHORaZSO-m3'


def upload_image(id, file, type):
    current_time = timezone.now()
    current_time_str = str(current_time)
    current_time_str = current_time_str.replace(' ', '').replace('.', '').replace('-', '').replace(':', '')
    file_name = str(id) + current_time_str + type + '.jpg'

    bucket_src = 'sjtulost'
    q = qiniu.Auth(ACCESS_KEY, SECRET_KEY)
    token = q.upload_token(bucket_src)
    ret, info = qiniu.put_data(token, file_name, file)
    if ret is None:
        return ''
    else:
        return "http://7xtbqj.com1.z0.glb.clouddn.com/" + file_name
