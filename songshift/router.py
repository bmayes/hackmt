


""" -------------------------------------------------------
------------------------------------------------------- """
@app.route('/')
def index():
    navbar = {}
    body = {}
    return render_template('index.html', navbar=navbar, body=body)