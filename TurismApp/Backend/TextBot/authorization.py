from telethon.sync import TelegramClient

from environs import Env

env = Env()
env.read_env()

api_id = env.int("API_ID")
api_hash = env.str("API_HASH")
phone = env.str("PHONE")

client = TelegramClient("support", api_id, api_hash)
client.connect()

if not client.is_user_authorized():
    client.send_code_request(phone)
    try:
        client.sign_in(phone, input('Enter the code: '))
    except:
        print('Failed to sign in')

print('Successfully signed in!')
client.disconnect()
