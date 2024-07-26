# Exercise Tracker

## Overview

This project is an Exercise Tracker built using Node.js, Express, and MongoDB. It provides endpoints to create users, add exercises, and retrieve exercise logs.

## Features

- **Create User**: POST to `/api/users` with a username to create a new user.
- **Get All Users**: GET request to `/api/users` to retrieve a list of all users.
- **Add Exercise**: POST to `/api/users/:_id/exercises` with a description, duration, and optionally a date to add an exercise for a user.
- **Get Exercise Logs**: GET request to `/api/users/:_id/logs` to retrieve a user's exercise log.
