from app import create_app

app = create_app()

@app.route("/")
def home():
    return {"status": "Usiwaste backend is live"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)

