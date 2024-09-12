from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import sqlalchemy

db = sqlalchemy.create_engine(
    "mariadb+pymysql://root:@localhost:3306/userdb", echo=True
)

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    data = request.get_json()
    # print(data)
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    # Perform registration logic here
    get_users()
    register_new_user(username, password, email)
    return jsonify({"message": "Registration successful"}), 200


def get_users():
    with db.connect() as conn:
        result = conn.execute(sqlalchemy.text("SELECT * FROM users"))
        # users = result.all()
        print(result.all())
        # return users

    return result.all()
    # return jsonify(users)


def register_new_user(username_input, password_input, email_input):
    with db.connect() as conn:
        result = conn.execute(
            sqlalchemy.text(
                "INSERT INTO users (id, username, password, email) VALUES (NULL, :username, :password, :email)"
            ),
            {
                "username": username_input,
                "password": password_input,
                "email": email_input,
            },
        )
        conn.commit()
        return get_users()


if __name__ == "__main__":
    # get_users()
    # register_new_user()
    app.run(debug=True)
