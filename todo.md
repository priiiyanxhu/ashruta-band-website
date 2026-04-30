# Ashruta Band Website - TODO

## Frontend (Completed in previous session)
- [x] Hero section with band logo and CTA buttons
- [x] About section with band story
- [x] Band members section with photos and Instagram links
- [x] Music player with placeholder tracks
- [x] Streaming platform buttons (Spotify + Apple Music)
- [x] Video gallery with hover effects and lightbox
- [x] Photo gallery section
- [x] Tour dates section with ticket links
- [x] Blog section with expandable posts
- [x] Instagram feed section (@ashruta_theband)
- [x] FAQ accordion section (16 questions across 4 categories)
- [x] Newsletter signup form
- [x] Contact form
- [x] Footer with quick links and social icons
- [x] Smooth scroll navigation with active section detection
- [x] Scroll progress bar
- [x] Premium scroll animations (parallax, text reveal, staggered, zoom)
- [x] Booking phone number (+91 8076861755) in tour and contact sections
- [x] Rachita's Instagram integrated into her member card

## Database & Backend (Current session)
- [x] Upgrade project to web-db-user (tRPC + MySQL + Auth)
- [x] Database schema: newsletter_subscribers table
- [x] Database schema: contact_submissions table
- [x] Database schema: booking_inquiries table
- [x] Database schema: blog_posts table
- [x] Run db:push to create tables in database
- [x] Server-side query helpers in server/db.ts
- [x] tRPC router: newsletter.subscribe (public)
- [x] tRPC router: contact.submit (public)
- [x] tRPC router: booking.submit (public)
- [x] tRPC router: blog.list (public)
- [x] tRPC router: admin routes (newsletter.list, contact.list, booking.list, etc.)
- [x] Owner notification on new newsletter subscriber
- [x] Owner notification on new contact submission
- [x] Owner notification on new booking inquiry
- [x] Connect newsletter form to tRPC mutation
- [x] Connect contact form to tRPC mutation
- [x] Admin dashboard page (/admin)
- [x] Admin: newsletter subscribers tab
- [x] Admin: contact messages tab with expand/collapse
- [x] Admin: booking inquiries tab with status management
- [x] Admin route in App.tsx

## Pending / Future
- [ ] Add booking inquiry form to the website (separate from contact form)
- [ ] Add real audio tracks to music player
- [ ] Connect blog posts to database (currently hardcoded)
