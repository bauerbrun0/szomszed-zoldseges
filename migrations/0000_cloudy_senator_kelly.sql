CREATE TABLE `admin_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text NOT NULL,
	`image` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer_needs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`content` text NOT NULL,
	`session_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `non_admin_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text NOT NULL,
	`image` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`person` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL,
	`secret` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text NOT NULL,
	`is_admin` integer DEFAULT false NOT NULL,
	`image` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_username_unique` ON `admin_users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `non_admin_users_username_unique` ON `non_admin_users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);