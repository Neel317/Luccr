from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)


# import required things 
from pptx import Presentation 
from pptx.util import Inches, Pt
from python_pptx_text_replacer import TextReplacer


# replacer = TextReplacer("Test LUCCR.pptx", slides='7-8', tables=True, charts=True, textframes=True)
# replacer.replace_text( [('Suscepti', 'Explore') ] )
# replacer.write_presentation_to_file("./Testing Luccr.pptx")



@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/forms')
def form_page():
    return render_template('forms.html')

@app.route('/formSubmit', methods=['GET', 'POST'])
def form_submit():
    
    # first_name = request.form.get("fname")
    if request.method == "POST":
        search_query = []
        search_query.append(('__topic__', request.form.get('__topic__')))
        search_query.append(('__exposureNotes__', request.form.get('__exposureNotes__')))
        search_query.append(('__severityNotes__', request.form.get('__severityNotes__')))
        search_query.append(('__susceptibilityNotes__', request.form.get('__susceptibilityNotes__')))

        j = 0
        for i in range(0, 7):
            if(i <= 3):
                issues = '__issues' + str(i) + '__'
                search_query.append((issues, request.form.get(issues)))
            choice = '__choiceInformation' + str(i) + '__'
            if(request.form.get(choice)):
                choice_query = '__choiceInformation' + str(j) + '__'
                search_query.append((choice_query, request.form.get(choice)))
                j+=1
        while(j < 4):
            choice_query = '__choiceInformation' + str(j) + '__'
            search_query.append((choice_query, ''))
            j+=1
        print(search_query)
        replacer = TextReplacer("Testing LUCCR.pptx", tables=True, charts=True, textframes=True)
        replacer.replace_text(search_query)
        replacer.write_presentation_to_file("./Luccr.pptx")
        response = send_from_directory(directory = app.root_path, path='Luccr.pptx')
        response.headers['my-custom-header'] = 'my-custom-status-0'
    return response


if __name__ == '__main__':
    app.run(debug=True)