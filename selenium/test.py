import json
import time
import chromedriver_binary
from selenium import webdriver

json_file = open('test_config.json', 'r')
config = json.load(json_file)


# WebDriver のオプションを設定する
options = webdriver.ChromeOptions()
# options.add_argument('--headless')

print('connectiong to remote browser...')
driver = webdriver.Chrome(options=options)

driver.get(config['url'])
print(driver.current_url)
time.sleep(float(config['wait_time']))

element = driver.find_element_by_tag_name("input")
element.send_keys(config['img_path'])


# ブラウザを終了する
# driver.quit()