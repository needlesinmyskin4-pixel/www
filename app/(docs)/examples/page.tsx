"use client"

import { AnimatedCodeBlock } from "@/components/animated-code-block"

const syncClientCode = `from rogiant import RogiantClient

# Create client (unauthenticated)
client = RogiantClient()

# Fetch user by ID
user = client.users.get_by_id(156)
print(f"{user.username} ({user.display_name})")

# Search games
games = client.games.search("Adopt Me", limit=5)
for game in games.data:
    print(f"{game.name} - {game.visits:,} visits")`

const asyncClientCode = `import asyncio
from rogiant import AsyncRogiantClient

async def main():
    async with AsyncRogiantClient() as client:  # OAuth supported
        # Parallel requests
        users = await asyncio.gather(
            client.users.get_by_id(156),
            client.users.get_by_id(1),
            client.users.get_by_id(2),
        )
        for user in users:
            print(user.username)

asyncio.run(main())`

const openCloudCode = `from rogiant import RogiantCloudClient

cloud = RogiantCloudClient(api_key="your-api-key")

# Read from DataStore
value = cloud.datastores.get(
    universe_id=123456,
    datastore="PlayerData",
    key="player_999"
)
print(value)  # {"coins": 1000, "level": 12}

# Write with optimistic concurrency
cloud.datastores.set(
    universe_id=123456,
    datastore="PlayerData",
    key="player_999",
    value={"coins": 1500, "level": 13},
    match_version="08D...",  # Optional version check
    user_ids=[999],  # GDPR association
)`

const localDatabaseCode = `from rogiant import RogiantClient, SessionDatabase

# Create or load SQLite database
db = SessionDatabase.load_or_create("my_session")

client = RogiantClient()

# Fetch and persist user
user = client.users.get_by_id(156)
db.save_user(user)

# Fetch and persist game
game = client.games.get_by_universe_id(2753915549)
db.save_game(game)

# Key-value storage
db.set("last_sync", "2024-01-15T10:30:00")
db.set("tracked_users", [156, 1, 2])

print(db.stats())  # {'users': 1, 'games': 1, ...}`

const rapTrackingCode = `from rogiant import RogiantClient
from rogiant.marketplace import RAPTracker

client = RogiantClient()  # OAuth supported
tracker = RAPTracker(client)

# Take snapshots over time
tracker.snapshot()  # Store current RAP values
# ... wait some time ...
tracker.snapshot()

# Compare changes
changes = tracker.diff()
for item_id, (old_rap, new_rap) in changes.items():
    print(f"Item {item_id}: {old_rap} → {new_rap}")

# Pretty summary
print(tracker.summary())`

const eventPollingCode = `from rogiant import RogiantClient, EventPoller

client = RogiantClient()  # OAuth supported

def on_friend_online(event):
    print(f"{event.username} came online!")

def on_new_message(event):
    print(f"New message! Unread: {event.count}")

def on_visit_milestone(event):
    print(f"{event.game_name} hit {event.visits:,} visits!")

poller = EventPoller(client)
poller.on_friend_online(on_friend_online)
poller.on_friend_offline(lambda e: print(f"{e.username} offline"))
poller.on_new_message(on_new_message)
poller.on_visit_milestone(on_visit_milestone)
poller.start()  # Blocks and polls`

const assetPublishingCode = `from rogiant import RogiantCloudClient
from rogiant.publish import PublishAPI

cloud = RogiantCloudClient(api_key="your-api-key")
publish = PublishAPI(cloud)

# Upload an image
result = publish.upload_image(
    file_path="./icon.png",
    name="My Game Icon",
    description="Icon for my game"
)

# Wait for processing
asset = publish.wait_for_asset(result.operation_id)
print(f"Asset ID: {asset.asset_id}")`

const interactiveTerminalCode = `from rogiant import RogiantSession

# Start interactive REPL
session = RogiantSession()
session.start()

# In the terminal:
# > start 156          # Set user context
# > auth               # Authenticate
# > whoami             # Current user info
# > user 156           # Lookup user
# > games "Adopt Me"   # Search games
# > friends 156        # Friend list
# > newdb mysession    # Create database
# > help               # Show commands`

const tableOfContents = [
  { name: "Examples", href: "#examples" },
  { name: "Sync Client", href: "#sync-client" },
  { name: "Async Client", href: "#async-client" },
  { name: "Open Cloud", href: "#open-cloud" },
  { name: "Local Database", href: "#local-database" },
  { name: "RAP Tracking", href: "#rap-tracking" },
  { name: "Event Polling", href: "#event-polling" },
  { name: "Asset Publishing", href: "#asset-publishing" },
  { name: "Interactive Terminal", href: "#interactive-terminal" },
]

export default function ExamplesPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Title */}
        <div id="examples" className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Examples</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Python examples for common Roblox workflows.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From user lookups and authentication to friends, presence, and local database caching.
            The library provides a consistent, typed interface across all Roblox API modules.
          </p>
        </div>

        {/* Sync Client */}
        <section id="sync-client" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Sync Client — Basic Usage</h2>
          <AnimatedCodeBlock code={syncClientCode} filename="example.py" typingSpeed={15} />
        </section>

        {/* Async Client */}
        <section id="async-client" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Async Client — High Throughput</h2>
          <AnimatedCodeBlock code={asyncClientCode} filename="async_example.py" typingSpeed={15} />
        </section>

        {/* Open Cloud */}
        <section id="open-cloud" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Open Cloud — DataStores</h2>
          <AnimatedCodeBlock code={openCloudCode} filename="cloud_example.py" typingSpeed={15} />
        </section>

        {/* Local Database */}
        <section id="local-database" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Local Database — Persistence</h2>
          <AnimatedCodeBlock code={localDatabaseCode} filename="database_example.py" typingSpeed={15} />
        </section>

        {/* RAP Tracking */}
        <section id="rap-tracking" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">RAP Tracking & Analytics</h2>
          <AnimatedCodeBlock code={rapTrackingCode} filename="rap_example.py" typingSpeed={15} />
        </section>

        {/* Event Polling */}
        <section id="event-polling" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Event Polling</h2>
          <AnimatedCodeBlock code={eventPollingCode} filename="events_example.py" typingSpeed={15} />
        </section>

        {/* Asset Publishing */}
        <section id="asset-publishing" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Asset Publishing</h2>
          <AnimatedCodeBlock code={assetPublishingCode} filename="publish_example.py" typingSpeed={15} />
        </section>

        {/* Interactive Terminal */}
        <section id="interactive-terminal" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Interactive Terminal</h2>
          <AnimatedCodeBlock code={interactiveTerminalCode} filename="terminal_example.py" typingSpeed={15} />
        </section>
      </div>

      {/* Right sidebar - Table of Contents */}
      <aside className="hidden xl:block w-56 shrink-0 px-4 py-10">
        <div className="sticky top-24">
          <h4 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide">ON THIS PAGE</h4>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
