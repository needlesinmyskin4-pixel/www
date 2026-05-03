"use client"

import { useState } from "react"
import {
  Search,
  Users,
  Gamepad2,
  ShoppingCart,
  UsersRound,
  Heart,
  Image,
  ArrowRightLeft,
  Award,
  Palette,
  MessageSquare,
  Shield,
  Upload,
  Bell,
  Code,
  Cloud,
  TrendingUp,
  Share2,
  Key,
  Check,
} from "lucide-react"

const apiCategories = [
  {
    icon: Users,
    category: "User Management",
    title: "Users & Identity",
    description:
      "Complete user identity resolution including lookup by ID, username search, authenticated user info, bulk fetching, username history, and validation.",
    endpoints: [
      { name: "get_user / get_by_id", desc: "Fetch user by ID" },
      { name: "get_authenticated_user", desc: "Current session user" },
      { name: "bulk_get_users", desc: "Fetch multiple users at once" },
      { name: "usernames_to_users", desc: "Resolve usernames" },
      { name: "username_history", desc: "Past usernames" },
      { name: "validate_username", desc: "Check availability" },
      { name: "search_users", desc: "Keyword search" },
    ],
  },
  {
    icon: Gamepad2,
    category: "Game Data",
    title: "Games & Experiences",
    description:
      "Full game/experience data including universe lookups, place resolution, visits, stats, servers, votes, favorites, game passes, and discovery.",
    endpoints: [
      { name: "get_games / get_game", desc: "Game details" },
      { name: "place_to_universe", desc: "Resolve place → universe" },
      { name: "get_visits / get_stats", desc: "Analytics" },
      { name: "search_games", desc: "Discovery" },
      { name: "get_recommended", desc: "Recommendations" },
      { name: "get_user_games / get_group_games", desc: "Creator games" },
      { name: "get_servers", desc: "Live server list" },
      { name: "get_votes / get_favorites", desc: "Social signals" },
      { name: "get_game_passes / get_place_details", desc: "Monetization" },
    ],
  },
  {
    icon: ShoppingCart,
    category: "Marketplace",
    title: "Catalog & Economy",
    description:
      "Item search, details, bundles, resale data, resellers, and economy endpoints for Robux balance and transactions.",
    endpoints: [
      { name: "search_items", desc: "Catalog search" },
      { name: "get_item_details", desc: "Full item info" },
      { name: "get_bundles / get_user_bundles", desc: "Bundle data" },
      { name: "get_resale_data", desc: "Price history" },
      { name: "get_resellers", desc: "Active sellers" },
      { name: "get_favorite_count", desc: "Item popularity" },
      { name: "get_robux_balance", desc: "Economy" },
      { name: "get_transactions", desc: "Transaction history" },
      { name: "get_group_funds", desc: "Group revenue" },
    ],
  },
  {
    icon: UsersRound,
    category: "Community",
    title: "Groups & Roles",
    description:
      "Group management including roles, members, join requests, wall posts, shouts, payouts, audit logs, settings, and relations.",
    endpoints: [
      { name: "get_group", desc: "Group details" },
      { name: "get_roles / get_role_members", desc: "Role management" },
      { name: "set_member_role", desc: "Rank changes" },
      { name: "kick_member", desc: "Moderation" },
      { name: "get_join_requests / accept / decline", desc: "Pending requests" },
      { name: "get_wall_posts", desc: "Group wall" },
      { name: "post_shout", desc: "Group shout" },
      { name: "get_payouts / set_payouts", desc: "Revenue distribution" },
      { name: "get_audit_log", desc: "Activity log" },
      { name: "get_allies / get_enemies", desc: "Relations" },
      { name: "search_groups", desc: "Discovery" },
      { name: "get_settings / update_settings", desc: "Configuration" },
    ],
  },
  {
    icon: Heart,
    category: "Social",
    title: "Friends & Presence",
    description:
      "Friend management, follower data, friend requests, and real-time presence tracking for online status.",
    endpoints: [
      { name: "get_friends", desc: "Friends list" },
      { name: "get_followers / get_following", desc: "Social graph" },
      { name: "get_friend_requests", desc: "Pending requests" },
      { name: "send_friend_request / accept / decline", desc: "Request management" },
      { name: "unfriend", desc: "Remove friend" },
      { name: "get_user_presences", desc: "Online status" },
      { name: "register_presence", desc: "Set presence" },
    ],
  },
  {
    icon: Image,
    category: "Media",
    title: "Thumbnails & Assets",
    description:
      "Thumbnail URLs for avatars, games, assets, groups, and badges with bulk fetching support.",
    endpoints: [
      { name: "get_avatar_thumbnails", desc: "User avatars" },
      { name: "get_game_thumbnails", desc: "Game icons" },
      { name: "get_asset_thumbnails", desc: "Asset images" },
      { name: "get_group_thumbnails", desc: "Group icons" },
      { name: "get_badge_thumbnails", desc: "Badge images" },
      { name: "Bulk operations supported", desc: "" },
    ],
  },
  {
    icon: ArrowRightLeft,
    category: "Trading",
    title: "Trades & Inventory",
    description:
      "Trade management, inventory access, collectibles, ownership checks, and RAP (Recent Average Price) calculations.",
    endpoints: [
      { name: "get_trades", desc: "Trade list" },
      { name: "get_trade_details", desc: "Full trade info" },
      { name: "send_trade / accept / decline", desc: "Trade management" },
      { name: "get_trade_count", desc: "Pending trades" },
      { name: "get_inventory", desc: "User inventory" },
      { name: "get_collectibles", desc: "Limited items" },
      { name: "check_ownership", desc: "Verify ownership" },
      { name: "get_total_rap", desc: "RAP calculation" },
    ],
  },
  {
    icon: Award,
    category: "Awards",
    title: "Badges & Achievements",
    description:
      "Badge data retrieval for games and users, including badge details, award dates, and statistics.",
    endpoints: [
      { name: "get_badge", desc: "Badge details" },
      { name: "get_game_badges", desc: "Game badge list" },
      { name: "get_user_badges", desc: "User achievements" },
      { name: "Bulk badge lookups", desc: "" },
    ],
  },
  {
    icon: Palette,
    category: "Appearance",
    title: "Avatar & Customization",
    description:
      "Avatar information, outfits, current wearing items, avatar rules, and body colors.",
    endpoints: [
      { name: "get_avatar", desc: "Current avatar info" },
      { name: "get_outfits", desc: "Saved outfits" },
      { name: "get_currently_wearing", desc: "Active items" },
      { name: "get_avatar_rules", desc: "Customization rules" },
      { name: "get_body_colors", desc: "Color configuration" },
    ],
  },
  {
    icon: MessageSquare,
    category: "Communication",
    title: "Messages & Chat",
    description:
      "Private messages, inbox management, unread counts, and real-time chat conversation support.",
    endpoints: [
      { name: "get_messages", desc: "Inbox messages" },
      { name: "get_unread_count", desc: "Unread notifications" },
      { name: "send_message", desc: "Send private message" },
      { name: "mark_as_read", desc: "Read receipts" },
      { name: "get_conversations", desc: "Chat threads" },
      { name: "get_chat_messages", desc: "Conversation history" },
    ],
  },
  {
    icon: Shield,
    category: "Trust & Safety",
    title: "Moderation & Safety",
    description:
      "Moderation helpers for account standing, content restrictions, abuse reports, blocking users, and text filtering.",
    endpoints: [
      { name: "get_account_standing", desc: "Account status" },
      { name: "get_content_restrictions", desc: "Age/region filters" },
      { name: "report_abuse", desc: "Submit reports" },
      { name: "block_user / unblock_user", desc: "User blocking" },
      { name: "filter_text", desc: "Content moderation" },
    ],
  },
  {
    icon: Upload,
    category: "Uploads",
    title: "Asset Publishing",
    description:
      "Open Cloud asset upload support for images, audio, and models with operation status tracking.",
    endpoints: [
      { name: "upload_image", desc: "Image assets" },
      { name: "upload_audio", desc: "Audio assets" },
      { name: "upload_model", desc: "3D models" },
      { name: "upload_auto", desc: "Auto-detect type" },
      { name: "get_operation_status", desc: "Track progress" },
      { name: "wait_for_asset", desc: "Await completion" },
    ],
  },
  {
    icon: Bell,
    category: "Alerts",
    title: "Notifications",
    description: "Open Cloud notifications for sending developer notifications to users.",
    endpoints: [
      { name: "send_notification", desc: "Push to users" },
      { name: "NotificationResult", desc: "Response handling" },
    ],
  },
  {
    icon: Code,
    category: "Develop",
    title: "Developer APIs",
    description:
      "Universe and place management, game settings, team create, plugins, stats, and revenue summaries.",
    endpoints: [
      { name: "get_universes", desc: "Universe list" },
      { name: "get_places", desc: "Place management" },
      { name: "get_game_settings / update_settings", desc: "Configuration" },
      { name: "get_team_create", desc: "Collaboration" },
      { name: "get_plugins", desc: "Plugin management" },
      { name: "get_stats", desc: "Analytics" },
      { name: "get_revenue_summary", desc: "Earnings" },
    ],
  },
  {
    icon: Cloud,
    category: "Cloud Platform",
    title: "Open Cloud APIs",
    description:
      "Roblox Open Cloud support including DataStores, Ordered DataStores, MessagingService, Instances API, and user restrictions (bans).",
    endpoints: [
      { name: "DataStores", desc: "get / set / delete / increment" },
      { name: "list_stores / list_keys / list_versions", desc: "" },
      { name: "get_version", desc: "Historical versions" },
      { name: "match_version", desc: "Optimistic concurrency" },
      { name: "exclusive_create", desc: "Create if absent" },
      { name: "user_ids / attributes", desc: "GDPR & metadata" },
      { name: "Ordered DataStores", desc: "Leaderboards" },
      { name: "MessagingService", desc: "Cross-server events" },
      { name: "publish_shutdown / announce", desc: "Server messages" },
      { name: "User Restrictions", desc: "ban_user / unban_user" },
      { name: "list_restrictions", desc: "Ban management" },
      { name: "Instances API", desc: "Read game hierarchy" },
      { name: "get_instance / get_children", desc: "DataModel access" },
    ],
  },
  {
    icon: TrendingUp,
    category: "Economy Tools",
    title: "Marketplace Analytics",
    description:
      "Higher-level economy analytics including limited item tracking, RAP analysis, resale profit calculations, and price trends.",
    endpoints: [
      { name: "LimitedData", desc: "RAP, sales, remaining" },
      { name: "Price history & volume tracking", desc: "" },
      { name: "Trend analysis", desc: "rising/falling/stable" },
      { name: "ResaleProfit", desc: "Fee calculations" },
      { name: "ROI % estimation", desc: "" },
      { name: "RAPTracker", desc: "Time-series snapshots" },
      { name: "diff() / summary()", desc: "Change detection" },
    ],
  },
  {
    icon: Share2,
    category: "Social Analytics",
    title: "Social Graph Analysis",
    description:
      "Derived social analysis including mutual friends, follow relationships, overlap matrices, and follow suggestions.",
    endpoints: [
      { name: "Mutual friends detection", desc: "" },
      { name: "Follow relationship mapping", desc: "" },
      { name: "Overlap matrices", desc: "" },
      { name: "Online presence snapshots", desc: "" },
      { name: "Follow suggestions", desc: "" },
    ],
  },
  {
    icon: Key,
    category: "Auth",
    title: "OAuth & Authentication",
    description:
      "OAuth flow management with browser-based authentication, token handling, and CSRF token management.",
    endpoints: [
      { name: "OAuthManager", desc: "Auth orchestration" },
      { name: "generate_auth_url", desc: "OAuth URL" },
      { name: "open_browser", desc: "Browser flow" },
      { name: "receive_token", desc: "Token callback" },
      { name: "CSRF token auto-refresh", desc: "" },
      { name: "Session management", desc: "" },
    ],
  },
]

export default function APICoveragePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = apiCategories.filter((cat) => {
    const query = searchQuery.toLowerCase()
    return (
      cat.title.toLowerCase().includes(query) ||
      cat.category.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query) ||
      cat.endpoints.some(
        (e) => e.name.toLowerCase().includes(query) || e.desc.toLowerCase().includes(query)
      )
    )
  })

  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">API Coverage</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive Roblox API coverage with typed responses.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* API Categories */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <div key={cat.title} className="rounded-lg border border-border">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Icon className="h-4 w-4" />
                    <span>{cat.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                </div>
                <div className="p-5 space-y-2">
                  {cat.endpoints.map((endpoint, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <span className="text-sm">
                        <code className="font-mono text-foreground">{endpoint.name}</code>
                        {endpoint.desc && (
                          <span className="text-muted-foreground"> — {endpoint.desc}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
