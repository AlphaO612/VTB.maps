# Use an official nginx runtime as a parent image
FROM nginx:latest

# Remove the default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom configuration file from the current directory
COPY ./backend/nginx/nginx.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80