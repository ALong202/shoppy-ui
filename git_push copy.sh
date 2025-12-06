#!/bin/bash
# 🚀 Script tự động push code lên GitHub (dùng cho Git Bash)

set -e  # Dừng script khi có lỗi

echo "=========================================="
echo "🚀 Tự động push code lên GitHub"
echo "=========================================="

# --- Xác định thư mục gốc repo ---
cd "$(git rev-parse --show-toplevel)" || exit 1

# --- Hiển thị branch hiện tại ---
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Đang ở nhánh: $current_branch"

# --- Nhập tên nhánh mới hoặc nhánh muốn làm ---
read -p "👉 Nhập tên nhánh (vd: feature/login): " branch

# --- Tạo hoặc chuyển nhánh ---
if git show-ref --verify --quiet refs/heads/"$branch"; then
  echo "🔹 Chuyển sang nhánh $branch..."
  git checkout "$branch"
else
  echo "🔹 Nhánh chưa tồn tại, tạo nhánh mới..."
  git checkout -b "$branch"
fi

# --- Xác nhận nhánh hiện tại thật sự ---
active_branch=$(git rev-parse --abbrev-ref HEAD)
echo "✅ Đang ở nhánh: $active_branch"

if [ "$active_branch" != "$branch" ]; then
  echo "❌ Lỗi: chưa chuyển đúng nhánh. Dừng script."
  exit 1
fi

# --- Commit message ---
echo -n "💬 Nhập commit message: "
read commitMsg < /dev/tty


# --- Add, commit, push ---
git add .
git commit -m "$commitMsg" || echo "(Không có gì để commit)"
git push -u origin "$branch"

# --- Merge vào main nếu muốn ---
read -p "✅ Có muốn merge vào main không? (y/n): " mergeOpt
if [[ "$mergeOpt" == "y" || "$mergeOpt" == "Y" ]]; then
  git checkout main
  git merge "$branch"
  git push origin main
  echo "✅ Merge hoàn tất!"
else
  echo "⚙️ Bỏ qua merge."
fi

echo "=========================================="
echo "✅ Hoàn tất!"
