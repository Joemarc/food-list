class ListSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :title, :description, :author
end