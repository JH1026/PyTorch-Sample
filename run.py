from flask import *
import base64
from service.classifyImgService import classfyDropImg

app = Flask(__name__)
app.config.from_object(__name__)
 
@app.route('/')
def index():
    return render_template('index.html', results={})

@app.route('/classification' , methods=["POST"])
def classification():
    if request.method == 'POST':
        data = request.form.get('dropImg') 

        img = base64.b64decode(data)
        filename = "sample.png"

        with open(filename, 'bw') as f4:
            f4.write(img)

        return jsonify(classfyDropImg(filename))
 
if __name__ == '__main__':
    app.run(debug=True)