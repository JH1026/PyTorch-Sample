from libs.classifyImg import ClassifyImg

def classfyDropImg(filepath):
    classifyImg = ClassifyImg()
    classifyImg.get_device(use_gpu=False)
    classifyImg.set_model()
    classifyImg.set_transform()
    classifyImg.set_img(filepath)
    classifyImg.predict()
    return classifyImg.get_output()
