from flask import Flask, render_template, request, jsonify
import boto3
from botocore.exceptions import ClientError

application = Flask(__name__)

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('flask_appdb')

@application.route('/')
def home():
    return render_template('base.html')

@application.route('/about')
def about():
    return render_template('about.html')

@application.route('/contact')
def contact():
    return render_template('contact.html')

@application.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        project_type = request.form.get('project-type')
        message = request.form.get('message')

        try:
            # Save data to DynamoDB
            response = table.put_item(
                Item={
                    'Name': name,
                    'Email': email,
                    'ProjectType': project_type,
                    'Message': message
                }
            )
            return jsonify({'success': True, 'message': 'Form submitted successfully'}), 200
        except ClientError as e:
            return jsonify({'success': False, 'message': str(e)}), 500

    return render_template('form.html')

if __name__ == '__main__':
    application.run(debug=True)