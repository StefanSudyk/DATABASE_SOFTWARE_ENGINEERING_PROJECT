from flask import Blueprint, render_template, url_for, request, redirect, session
from app import db
prop = Blueprint('prop', __name__, template_folder="templates", static_folder="static")