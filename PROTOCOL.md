# Optimus Chat WebSocket Protocol

This document defines the WebSocket protocol for the Optimus Chat application.

All messages are JSON objects, and the protocol consists of a series of message types that facilitate communication between the client and server.

## 1. Overview

### 1.1 From Client to Server

```json
{
  "type": "<message_type>",
  "data": { ... }
}
```

### 1.2 From Server to Client

```json
{
	"type": "<message_type>",
	"date": "<timestamp>",
	"data": { ... }
}
```

## 2. Chat Message Types

### 2.1 To Server

Format for chat messages sent to the server:

```json
{
	"type": "chat_message",
	"data": {
		"channel": "<channel_id>",
		"content": "<message_content>"
	}
}
```

### 2.2 From Server

Format for chat messages received from the server:
```json
{
	"type": "chat_message",
	"date": "<timestamp>",
	"data": {
		"channel": "<channel_id>",
		"user_id": "<user_id>",
		"content": "<message_content>"
	}
}
```

## 3. Channel Creation / Management

Subscribing to a channel should also create it if it does not exist.

### 3.1 Subscribe to Channel
```json
{
	"type": "subscribe_channel",
	"data": {
		"channel": "<channel_id>"
	}
}
```
### 3.2 Send User list to front
```json
{
	"type": "Users_list",
	"channel": "channel_id",
	"users": "user_id"
}
```