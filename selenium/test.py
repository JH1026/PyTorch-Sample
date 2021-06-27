import json
import time
import chromedriver_binary
from selenium import webdriver 

# config
json_file = open('test_config.json', 'r')
config = json.load(json_file)
base_url = config['url']
wait_time = float(config['wait_time'])
drop_img_path = config['img_path']
json_file.close()


options = webdriver.ChromeOptions()
# options.add_argument('--headless')

# page access
driver = webdriver.Chrome(options=options)
driver.get(base_url)
time.sleep(wait_time)

# drop img
element = driver.find_element_by_tag_name("input")
element.send_keys(drop_img_path)
time.sleep(0.25)

# classify img
buttons = driver.find_elements_by_tag_name("button")
for button in buttons:
    if button.text == "CLASSIFY":
        button.click()
        break

time.sleep(1.25)

# check output
element = driver.find_element_by_class_name("content-area")
assert '%' in element.text
driver.quit()
